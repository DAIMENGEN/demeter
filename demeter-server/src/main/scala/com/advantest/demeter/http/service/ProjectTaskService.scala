package com.advantest.demeter.http.service

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.*
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.table.project.task.ProjectTaskDBTable
import com.advantest.demeter.database.table.project.task.attribute.ProjectTaskAttributeDBTable
import com.advantest.demeter.database.table.project.task.value.{ProjectTaskAttributeValueDBTableRow, ProjectTaskBooleanTypeAttributeValueDBTable as BooleanTypeValueDBTable, ProjectTaskDateTypeAttributeValueDBTable as DateTypeValueDBTable, ProjectTaskDatetimeTypeAttributeValueDBTable as DatetimeTypeValueDBTable, ProjectTaskDoubleTypeAttributeValueDBTable as DoubleTypeValueDBTable, ProjectTaskFloatTypeAttributeValueDBTable as FloatTypeValueDBTable, ProjectTaskIntTypeAttributeValueDBTable as IntTypeValueDBTable, ProjectTaskJsonTypeAttributeValueDBTable as JsonTypeValueDBTable, ProjectTaskLongTypeAttributeValueDBTable as LongTypeValueDBTable, ProjectTaskLongtextTypeAttributeValueDBTable as LongtextTypeValueDBTable, ProjectTaskMediumtextTypeAttributeValueDBTable as MediumtextTypeValueDBTable, ProjectTaskStringTypeAttributeValueDBTable as StringTypeValueDBTable, ProjectTaskTextTypeAttributeValueDBTable as TextTypeValueDBTable}
import com.advantest.demeter.http.HttpService
import com.advantest.demeter.http.payload.{ProjectTaskAttributePayload, ProjectTaskAttributeValuePayload, ProjectTaskPayload}

import scala.concurrent.Future
import scala.language.implicitConversions

/**
 * Create on 2024/12/20
 * Author: mengen.dai@outlook.com
 */
case class ProjectTaskService()(using system: DemeterSystem, db: Database) extends HttpService(system):
  private val projectTaskDBTable: ProjectTaskDBTable = ProjectTaskDBTable()
  private val attributeDBTable: ProjectTaskAttributeDBTable = ProjectTaskAttributeDBTable()
  private val intTypeValueDBTable: IntTypeValueDBTable = IntTypeValueDBTable()
  private val dateTypeValueDBTable: DateTypeValueDBTable = DateTypeValueDBTable()
  private val jsonTypeValueDBTable: JsonTypeValueDBTable = JsonTypeValueDBTable()
  private val longTypeValueDBTable: LongTypeValueDBTable = LongTypeValueDBTable()
  private val floatTypeValueDBTable: FloatTypeValueDBTable = FloatTypeValueDBTable()
  private val doubleTypeValueDBTable: DoubleTypeValueDBTable = DoubleTypeValueDBTable()
  private val stringTypeValueDBTable: StringTypeValueDBTable = StringTypeValueDBTable()
  private val booleanTypeValueDBTable: BooleanTypeValueDBTable = BooleanTypeValueDBTable()
  private val datetimeTypeValueDBTable: DatetimeTypeValueDBTable = DatetimeTypeValueDBTable()
  private val textTypeValueDBTable: TextTypeValueDBTable = TextTypeValueDBTable()
  private val longtextTypeValueDBTable: LongtextTypeValueDBTable = LongtextTypeValueDBTable()
  private val mediumtextTypeValueDBTable: MediumtextTypeValueDBTable = MediumtextTypeValueDBTable()

  private def buildInsertTaskAttributeValueRowsAction(taskAttributeValueRows: Seq[ProjectTaskAttributeValueDBTableRow]) =
    DBIO.sequence(taskAttributeValueRows.map: taskAttributeValueRow =>
      taskAttributeValueRow.taskAttributeValue match
        case DBIntValue(_) => intTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBLongValue(_) => longTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBFloatValue(_) => floatTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBDoubleValue(_) => doubleTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBVarcharValue(_) => stringTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBTextValue(_) => textTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBMediumtextValue(_) => mediumtextTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBLongtextValue(_) => longtextTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBBooleanValue(_) => booleanTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBJsonValue(_) => jsonTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBDateValue(_) => dateTypeValueDBTable.tableQuery += taskAttributeValueRow
        case DBDateTimeValue(_) => datetimeTypeValueDBTable.tableQuery += taskAttributeValueRow
    )

  def getTasksByProjectId(projectId: Long): Future[Seq[ProjectTaskPayload]] =
    val taskRowsFuture = projectTaskDBTable.queryByProjectId(projectId)
    val taskAttributeRowsFuture = attributeDBTable.queryByProjectId(projectId)
    val taskIntAttributeValueRowsFuture = Future.sequence(Seq(
      intTypeValueDBTable.queryByProjectId(projectId),
      dateTypeValueDBTable.queryByProjectId(projectId),
      jsonTypeValueDBTable.queryByProjectId(projectId),
      longTypeValueDBTable.queryByProjectId(projectId),
      floatTypeValueDBTable.queryByProjectId(projectId),
      doubleTypeValueDBTable.queryByProjectId(projectId),
      stringTypeValueDBTable.queryByProjectId(projectId),
      booleanTypeValueDBTable.queryByProjectId(projectId),
      datetimeTypeValueDBTable.queryByProjectId(projectId),
      textTypeValueDBTable.queryByProjectId(projectId),
      longtextTypeValueDBTable.queryByProjectId(projectId),
      mediumtextTypeValueDBTable.queryByProjectId(projectId)
    )).map(_.flatten)
    for
      taskRows <- taskRowsFuture
      taskAttributeRows <- taskAttributeRowsFuture
      taskIntAttributeValueRows <- taskIntAttributeValueRowsFuture
    yield
      val taskAttributeEntities = taskAttributeRows.map(_.toPayload)
      val taskIntAttributeValueEntitiesMap = taskIntAttributeValueRows.map(_.toPayload).groupBy(_.taskId)
      taskRows.map: taskRow =>
        ProjectTaskPayload(
          id = taskRow.id.value,
          taskName = taskRow.taskName.value,
          taskAttributes = taskAttributeEntities,
          taskAttributeValues = taskIntAttributeValueEntitiesMap.getOrElse(taskRow.id.value, Seq.empty)
        )

  def getTaskAttributesByProjectId(projectId: Long): Future[Seq[ProjectTaskAttributePayload]] =
    attributeDBTable.queryByProjectId(projectId).map(_.map(_.toPayload))

  def createTask(employeeId: Long, projectId: Long, task: ProjectTaskPayload): Future[ProjectTaskPayload] =
    createTasks(employeeId, projectId, Seq(task)).map:
      case Seq(task) => task
      case _ => throw new RuntimeException("create task failed")

  def createTasks(employeeId: Long, projectId: Long, tasks: Seq[ProjectTaskPayload]): Future[Seq[ProjectTaskPayload]] =
    val optionData = Some(Map("projectId" -> projectId))
    val taskRow = tasks.map(task => ProjectTaskPayload.create(employeeId, task, optionData))
    val taskRowIds = taskRow.map(_.id)
    val taskAttributeValueRows = tasks.flatMap(task => task.taskAttributeValues.map(taskAttributeValue => ProjectTaskAttributeValuePayload.create(employeeId, taskAttributeValue, optionData)))
    val insertTaskRows = projectTaskDBTable.tableQuery ++= taskRow
    val insertTaskAttributeValueRows = buildInsertTaskAttributeValueRowsAction(taskAttributeValueRows)
    val selectTaskRows = projectTaskDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result
    val selectTaskAttributes = attributeDBTable.tableQuery.filter(_.projectId === DBLongValue(projectId)).result
    val selectTaskAttributeValueRows = DBIO.sequence(Seq(
      intTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      dateTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      jsonTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      longTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      floatTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      doubleTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      stringTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      booleanTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      datetimeTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      textTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      longtextTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
      mediumtextTypeValueDBTable.tableQuery.filter(_.id.inSet(taskRowIds)).result,
    ))
    val transaction = (insertTaskRows andThen insertTaskAttributeValueRows andThen (selectTaskRows zip selectTaskAttributes zip selectTaskAttributeValueRows)).transactionally
    db.run(transaction).map:
      case ((taskRows, taskAttributeRows), taskAttributeValueRows) =>
        taskRows.map: taskRow =>
          ProjectTaskPayload(
            id = taskRow.id.value,
            taskName = taskRow.taskName.value,
            taskAttributes = taskAttributeRows.map(_.toPayload),
            taskAttributeValues = taskAttributeValueRows.flatten.filter(_.id == taskRow.id).map(_.toPayload),
          )

  def createTaskAttribute(employeeId: Long, projectId: Long, attribute: ProjectTaskAttributePayload): Future[ProjectTaskAttributePayload] =
    val optionData = Some(Map("projectId" -> projectId))
    val tableRowData = ProjectTaskAttributePayload.create(employeeId, attribute, optionData)
    attributeDBTable.insert(tableRowData).map(_.toPayload)

  def createTaskAttributes(employeeId: Long, projectId: Long, attributes: Seq[ProjectTaskAttributePayload]): Future[Seq[ProjectTaskAttributePayload]] =
    val optionData = Some(Map("projectId" -> projectId))
    val tableRows = attributes.map: attribute =>
      ProjectTaskAttributePayload.create(employeeId, attribute, optionData)
    attributeDBTable.batchInsert(tableRows).map(_.map(_.toPayload))
