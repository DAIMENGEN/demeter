package com.advantest.demeter.http.route

import akka.http.scaladsl.server.Directives.*
import akka.http.scaladsl.server.Route
import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.http.jwt.JwtSecret
import com.advantest.demeter.http.payload.{ProjectPayload, ProjectTaskAttributePayload, ProjectTaskPayload}
import com.advantest.demeter.http.service.ProjectService
import com.advantest.demeter.http.{ApiRequest, ApiResponse, HttpRoute}
import spray.json.DefaultJsonProtocol.*

/**
 * Create on 2024/10/27
 * Author: mengen.dai@outlook.com
 */
case class ProjectRoute()(using val system: DemeterSystem, db: Database, val jwtSecret: JwtSecret) extends HttpRoute with ApiRequest with ApiResponse:
  private val projectService: ProjectService = ProjectService()

  override def route: Route = concat(
    createProjectRoute,
    createProjectsRoute,
    createProjectTaskRoute,
    createProjectTasksRoute,
    createProjectTaskAttributeRoute,
    createProjectTaskAttributesRoute,
    deleteProjectsRoute(),
    deleteProjectByIdRoute(),
    deleteProjectsByIdsRoute(),
    updateProjectRoute(),
    updateProjectsRoute(),
    getAllProjectsRoute,
    getProjectByIdRoute,
    getProjectsByIdsRoute,
    getProjectsByEmployeeIdRoute,
    getProjectStatusSelectOptionsRoute,
    getProjectTasksByProjectIdRoute,
    getProjectTaskAttributesByProjectIdRoute,
    getProjectTaskTypeSelectOptionsRoute,
    getProjectTaskStatusSelectOptionsRoute
  )

  private def createProjectRoute: Route = path("createProjectRoute"):
    post:
      validateToken: employee =>
        entity(as[ProjectPayload]):
          request =>
            response(projectService.createProject(employee.id, request))

  private def createProjectsRoute: Route = path("createProjectsRoute"):
    post:
      validateToken: employee =>
        entity(as[Seq[ProjectPayload]]):
          request =>
            response(projectService.createProjects(employee.id, request))

  private def createProjectTaskRoute: Route = path("createProjectTaskRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectId = request.readLong("projectId")
            val projectTask = request.read[ProjectTaskPayload]("projectTask")
            response(projectService.createProjectTask(employee.id, projectId, projectTask))

  private def createProjectTasksRoute: Route = path("createProjectTasksRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectId = request.readLong("projectId")
            val projectTasks = request.read[Seq[ProjectTaskPayload]]("projectTasks")
            response(projectService.createProjectTasks(employee.id, projectId, projectTasks))

  private def createProjectTaskAttributeRoute: Route = path("createProjectTaskAttributeRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectId = request.readLong("projectId")
            val projectTaskAttribute = request.read[ProjectTaskAttributePayload]("projectTaskAttribute")
            response(projectService.createProjectTaskAttribute(employee.id, projectId, projectTaskAttribute))

  private def createProjectTaskAttributesRoute: Route = path("createProjectTaskAttributesRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectId = request.readLong("projectId")
            val projectTaskAttributes = request.read[Seq[ProjectTaskAttributePayload]]("projectTaskAttributes")
            response(projectService.createProjectTaskAttributes(employee.id, projectId, projectTaskAttributes))

  private def deleteProjectsRoute(): Route = path("deleteProjectsRoute"):
    post:
      validateToken: employee =>
        response(projectService.deleteProjects(employee.id))

  private def deleteProjectByIdRoute(): Route = path("deleteProjectByIdRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectId = request.readLong("projectId")
            response(projectService.deleteProjectById(employee.id, projectId))

  private def deleteProjectsByIdsRoute(): Route = path("deleteProjectsByIdsRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectIds = request.readLongArray("projectIds")
            response(projectService.deleteProjectsByIds(employee.id, projectIds))

  private def updateProjectRoute(): Route = path("updateProjectRoute"):
    put:
      validateToken: employee =>
        entity(as[ProjectPayload]):
          request =>
            response(projectService.updateProject(employee.id, request))

  private def updateProjectsRoute(): Route = path("updateProjectsRoute"):
    put:
      validateToken: employee =>
        entity(as[Seq[ProjectPayload]]):
          request =>
            response(projectService.updateProjects(employee.id, request))

  private def getAllProjectsRoute: Route = path("getAllProjectsRoute"):
    get:
      validateToken: employee =>
        response(projectService.getAllProjects(employee.id))

  private def getProjectByIdRoute: Route = path("getProjectByIdRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectId = request.readLong("projectId")
            response(projectService.getProjectById(employee.id, projectId))

  private def getProjectsByIdsRoute: Route = path("getProjectsByIdsRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectIds = request.readLongArray("projectIds")
            response(projectService.getProjectsByIds(employee.id, projectIds))

  private def getProjectsByEmployeeIdRoute: Route = path("getProjectsByEmployeeIdRoute"):
    get:
      validateToken: employee =>
        response(projectService.getProjectsByEmployeeId(employee.id))

  private def getProjectStatusSelectOptionsRoute: Route = path("getProjectStatusSelectOptionsRoute"):
    get:
      response(projectService.getProjectStatusSelectOptions)

  private def getProjectTasksByProjectIdRoute: Route = path("getProjectTasksByProjectIdRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectId = request.readLong("projectId")
            response(projectService.getProjectTasksByProjectId(employee.id, projectId))

  private def getProjectTaskAttributesByProjectIdRoute: Route = path("getProjectTaskAttributesByProjectIdRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val projectId = request.readLong("projectId")
            response(projectService.getProjectTaskAttributesByProjectId(employee.id, projectId))

  private def getProjectTaskTypeSelectOptionsRoute: Route = path("getProjectTaskTypeSelectOptionsRoute"):
    get:
      response(projectService.getProjectTaskTypeSelectOptions)

  private def getProjectTaskStatusSelectOptionsRoute: Route = path("getProjectTaskStatusSelectOptionsRoute"):
    get:
      response(projectService.getProjectTaskStatusSelectOptions)

