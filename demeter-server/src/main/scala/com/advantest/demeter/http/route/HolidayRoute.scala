package com.advantest.demeter.http.route

import akka.http.scaladsl.server.Directives.*
import akka.http.scaladsl.server.Route
import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.http.jwt.JwtSecret
import com.advantest.demeter.http.payload.HolidayPayload
import com.advantest.demeter.http.service.HolidayService
import com.advantest.demeter.http.{ApiRequest, ApiResponse, HttpRoute}
import spray.json.DefaultJsonProtocol.*


/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 */
case class HolidayRoute()(using val system: DemeterSystem, db: Database, val jwtSecret: JwtSecret) extends HttpRoute with ApiRequest with ApiResponse:
  private val holidayService = HolidayService()

  override def route: Route = concat(
    createHolidayRoute,
    createHolidaysRoute,
    deleteHolidaysRoute(),
    deleteHolidayByIdRoute(),
    deleteHolidayByIdsRoute(),
    updateHolidayRoute(),
    updateHolidaysRoute(),
    getHolidaysRoute,
    getNationalHolidaysRoute,
    getCompanyHolidaysRoute,
    getSpecialWorkdaysRoute
  )

  private def createHolidayRoute: Route = path("createHolidayRoute"):
    post:
      validateToken: employee =>
        entity(as[HolidayPayload]):
          request =>
            response(holidayService.createHoliday(employee.id, request))

  private def createHolidaysRoute: Route = path("createHolidaysRoute"):
    post:
      validateToken: employee =>
        entity(as[Seq[HolidayPayload]]):
          request =>
            response(holidayService.createHolidays(employee.id, request))

  private def deleteHolidaysRoute(): Route = path("deleteHolidaysRoute"):
    delete:
      validateToken: employee =>
        response(holidayService.deleteHolidays(employee.id))

  private def deleteHolidayByIdRoute(): Route = path("deleteHolidayByIdRoute"):
    delete:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val holidayId = request.readLong("holidayId")
            response(holidayService.deleteHolidayById(employee.id, holidayId))

  private def deleteHolidayByIdsRoute(): Route = path("deleteHolidayByIdsRoute"):
    delete:
      validateToken: employee =>
        entity(as[HttpRequestParams]):
          request =>
            val holidayIds = request.readLongArray("holidayIds")
            response(holidayService.deleteHolidayByIds(employee.id, holidayIds))

  private def updateHolidayRoute(): Route = path("updateHolidayRoute"):
    post:
      validateToken: employee =>
        entity(as[HolidayPayload]):
          request =>
            response(holidayService.updateHoliday(employee.id, request))

  private def updateHolidaysRoute(): Route = path("updateHolidaysRoute"):
    put:
      validateToken: employee =>
        entity(as[Seq[HolidayPayload]]):
          request =>
            response(holidayService.updateHolidays(employee.id, request))

  private def getHolidaysRoute: Route = path("getHolidaysRoute"):
    get:
      response(holidayService.getHolidays)

  private def getNationalHolidaysRoute: Route = path("getNationalHolidaysRoute"):
    get:
      response(holidayService.getNationalHolidays)

  private def getCompanyHolidaysRoute: Route = path("getCompanyHolidaysRoute"):
    get:
      response(holidayService.getCompanyHolidays)

  private def getSpecialWorkdaysRoute: Route = path("getSpecialWorkdaysRoute"):
    get:
      response(holidayService.getSpecialWorkdays)

