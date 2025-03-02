package com.advantest.demeter.http.route

import akka.http.scaladsl.server.Directives.*
import akka.http.scaladsl.server.Route
import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.http.jwt.JwtSecret
import com.advantest.demeter.http.payload.EmployeePayload
import com.advantest.demeter.http.service.EmployeeService
import com.advantest.demeter.http.{ApiRequest, ApiResponse, HttpRoute}
import spray.json.DefaultJsonProtocol.*

import scala.concurrent.Future

/**
 * Create on 2024/10/14
 * Author: mengen.dai@outlook.com
 */
case class EmployeeRoute()(using val system: DemeterSystem, db: Database, val jwtSecret: JwtSecret) extends HttpRoute with ApiRequest with ApiResponse:
  private val employeeService = EmployeeService()

  override def route: Route = concat(
    loginRoute,
    logoutRoute,
    registerRoute,
    batchRegisterRoute,
    resetPasswordRoute,
    getCurrentEmployeeIdRoute,
    getCurrentEmployeeNameRoute,
    getEmployeeSelectOptionsRoute
  )

  private def loginRoute: Route = path("loginRoute"):
    post:
      entity(as[HttpRequestParams]): request =>
        val account = request.readString("account")
        val password = request.readString("password")
        val future = employeeService.verifyPassword(account, password).map(generateToken)
        response(future)

  private def logoutRoute: Route = path("logoutRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]): request =>
          val account = request.readString("account")
          val account_ = employee.account
          if account == account_ then response(Future("Logout success"))
          else response(Future("Logout failure"))

  private def registerRoute: Route = path("registerRoute"):
    post:
      entity(as[EmployeePayload]): request =>
        val future = employeeService.register(request)
        response(future)

  private def batchRegisterRoute: Route = path("batchRegisterRoute"):
    post:
      validateToken: employee =>
        entity(as[List[EmployeePayload]]):
          request =>
            val future = employeeService.register(employee.id, request)
            response(future)

  private def resetPasswordRoute: Route = path("resetPasswordRoute"):
    post:
      validateToken: employee =>
        entity(as[HttpRequestParams]): request =>
          val oldPassword = request.readString("oldPassword")
          val newPassword = request.readString("newPassword")
          val future = employeeService.resetPassword(employee.id, oldPassword, newPassword)
          response(future)

  private def getCurrentEmployeeIdRoute: Route = path("getCurrentEmployeeIdRoute"):
    get:
      validateToken: employee =>
        val employeeId = employee.id
        response(Future(employeeId.toString))

  private def getCurrentEmployeeNameRoute: Route = path("getCurrentEmployeeNameRoute"):
    get:
      validateToken: employee =>
        val username = employee.employeeName
        response(Future(username))

  private def getEmployeeSelectOptionsRoute: Route = path("getEmployeeSelectOptionsRoute"):
    post:
      validateToken: _ =>
        entity(as[HttpRequestParams]):
          request =>
            val employeeName = request.readString("employeeName")
            val future = employeeService.getEmployeeSelectOptions(employeeName)
            response(future)

