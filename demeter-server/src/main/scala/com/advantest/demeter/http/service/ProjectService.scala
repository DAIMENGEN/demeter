package com.advantest.demeter.http.service

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.common.{IntNumericValue, SelectNumericOption}
import com.advantest.demeter.constant.project.ProjectStatus
import com.advantest.demeter.constant.project.task.{ProjectTaskStatus, ProjectTaskType}
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.table.project.{ProjectDBTable, ProjectDBTableRow}
import com.advantest.demeter.http.HttpService
import com.advantest.demeter.http.payload.{ProjectPayload, ProjectTaskAttributePayload, ProjectTaskPayload}

import scala.concurrent.Future
import scala.language.implicitConversions

/**
 * Create on 2024/10/27
 * Author: mengen.dai@outlook.com
 */
case class ProjectService()(using system: DemeterSystem, db: Database) extends HttpService(system):
  private val projectDBTable: ProjectDBTable = ProjectDBTable()
  private val employeeService: EmployeeService = EmployeeService()
  private val projectTaskService: ProjectTaskService = ProjectTaskService()

  private def isCreator(employeeId: Long, projectId: Long): Future[Boolean] =
    logger.info(s"Checking if employee $employeeId is the creator of project $projectId.")
    projectDBTable.queryById(projectId).map:
      case Some(value) => value.creatorId.value == employeeId
      case None => throw new NoSuchElementException(s"Project with ID $projectId not found")

  def createProject(employeeId: Long, project: ProjectPayload): Future[ProjectPayload] =
    val tableRowData = ProjectPayload.create(employeeId, project)
    projectDBTable.insert(tableRowData).map(_.toPayload)

  def createProjects(employeeId: Long, projects: Seq[ProjectPayload]): Future[Seq[ProjectPayload]] =
    val tableRows = projects.map(project => ProjectPayload.create(employeeId, project))
    projectDBTable.batchInsert(tableRows).map(_.map(_.toPayload))

  def createProjectTask(employeeId: Long, projectId: Long, projectTask: ProjectTaskPayload): Future[ProjectTaskPayload] =
    projectTaskService.createTask(employeeId, projectId, projectTask)

  def createProjectTasks(employeeId: Long, projectId: Long, projectTasks: Seq[ProjectTaskPayload]): Future[Seq[ProjectTaskPayload]] =
    projectTaskService.createTasks(employeeId, projectId, projectTasks)

  def createProjectTaskAttribute(employeeId: Long, projectId: Long, projectTaskAttribute: ProjectTaskAttributePayload): Future[ProjectTaskAttributePayload] =
    projectTaskService.createTaskAttribute(employeeId, projectId, projectTaskAttribute)

  def createProjectTaskAttributes(employeeId: Long, projectId: Long, projectTaskAttributes: Seq[ProjectTaskAttributePayload]): Future[Seq[ProjectTaskAttributePayload]] =
    projectTaskService.createTaskAttributes(employeeId, projectId, projectTaskAttributes)

  def deleteProjects(employeeId: Long): Future[Seq[ProjectPayload]] =
    if !employeeService.checkIfAdmin(employeeId) then Future.failed(new SecurityException("Only system admin can delete projects."))
    projectDBTable.delete().map(_.map(_.toPayload))

  def deleteProjectById(employeeId: Long, id: Long): Future[ProjectPayload] =
    logger.info(s"Employee with ID $employeeId is deleting project with ID $id")
    projectDBTable.deleteById(id).map(_.toPayload)

  def deleteProjectsByIds(employeeId: Long, ids: Seq[Long]): Future[Seq[ProjectPayload]] =
    logger.info(s"Employee with ID $employeeId is deleting projects with IDs $ids")
    projectDBTable.deleteByIds(ids).map(_.map(_.toPayload))

  def updateProject(employeeId: Long, project: ProjectPayload): Future[ProjectPayload] =
    projectDBTable.queryById(project.id).flatMap:
      case Some(oldRowData: ProjectDBTableRow) =>
        val updatedProject = ProjectPayload.update(employeeId, project, oldRowData)
        projectDBTable.update(updatedProject).map(_.toPayload)
      case None => throw new NoSuchElementException(s"Project with ID ${project.id} not found")

  def updateProjects(employeeId: Long, projects: Seq[ProjectPayload]): Future[Seq[ProjectPayload]] =
    projectDBTable.queryByIds(projects.map(_.id)).flatMap: oldRowDataSeq =>
      val oldRowDataMap = oldRowDataSeq.map(oldRowData => oldRowData.id -> oldRowData).toMap
      val updatedProjectSeq = projects.flatMap: project =>
        oldRowDataMap.get(project.id).map: oldRowData =>
          ProjectPayload.update(employeeId, project, oldRowData)
      projectDBTable.update(updatedProjectSeq).map(_.map(_.toPayload))

  def getAllProjects(employeeId: Long): Future[Seq[ProjectPayload]] =
    if !employeeService.checkIfAdmin(employeeId) then Future.failed(new IllegalArgumentException("Only system admin can get all projects."))
    projectDBTable.query().map(_.map(_.toPayload))

  def getProjectById(employeeId: Long, id: Long): Future[Option[ProjectPayload]] =
    logger.info(s"Employee with ID $employeeId is getting project with ID $id")
    projectDBTable.queryById(id).map(_.map(_.toPayload))

  def getProjectsByIds(employeeId: Long, ids: Seq[Long]): Future[Seq[ProjectPayload]] =
    logger.info(s"Employee with ID $employeeId is getting projects with IDs $ids")
    projectDBTable.queryByIds(ids).map(_.map(_.toPayload))

  def getProjectsByEmployeeId(employeeId: Long): Future[Seq[ProjectPayload]] =
    projectDBTable.queryByCreatorId(employeeId).map(_.map(_.toPayload))

  def getProjectStatusSelectOptions: Future[Seq[SelectNumericOption]] =
    Future.successful(ProjectStatus.values.map: status =>
      val label = status.toString
      val value = status.toInt
      SelectNumericOption(label, IntNumericValue(value))
    )

  def getProjectTasksByProjectId(employeeId: Long, projectId: Long): Future[Seq[ProjectTaskPayload]] =
    projectTaskService.getTasksByProjectId(projectId)

  def getProjectTaskAttributesByProjectId(employeeId: Long, projectId: Long): Future[Seq[ProjectTaskAttributePayload]] =
    projectTaskService.getTaskAttributesByProjectId(projectId)

  def getProjectTaskTypeSelectOptions: Future[Seq[SelectNumericOption]] =
    Future.successful(ProjectTaskType.values.map: taskType =>
      val label = taskType.toString
      SelectNumericOption(label, IntNumericValue(taskType.toInt))
    )

  def getProjectTaskStatusSelectOptions: Future[Seq[SelectNumericOption]] =
    Future.successful(ProjectTaskStatus.values.map: taskStatus =>
      val label = taskStatus.toString
      SelectNumericOption(label, IntNumericValue(taskStatus.toInt))
    )
