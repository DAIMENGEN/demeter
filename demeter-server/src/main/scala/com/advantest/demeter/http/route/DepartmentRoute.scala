package com.advantest.demeter.http.route

import akka.http.scaladsl.server.Directives.*
import akka.http.scaladsl.server.Route
import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.http.jwt.JwtSecret
import com.advantest.demeter.http.service.DepartmentService
import com.advantest.demeter.http.{ApiRequest, ApiResponse, HttpRoute}
import spray.json.DefaultJsonProtocol.*

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
case class DepartmentRoute()(using val system: DemeterSystem, db: Database, val jwtSecret: JwtSecret) extends HttpRoute with ApiRequest with ApiResponse:
  private val departmentService: DepartmentService = DepartmentService()

  override def route: Route = concat(
    getAllDepartmentsRoute
  )

  private def getAllDepartmentsRoute: Route = path("getAllDepartmentsRoute"):
    get:
      val future = departmentService.getAllDepartments
      response(future)

