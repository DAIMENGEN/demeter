package com.advantest.demeter.http.service

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.constant.holiday.{CompanyHoliday, NationalHoliday, SpecialHoliday}
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.table.holiday.{HolidayDBTable, HolidayDBTableRow}
import com.advantest.demeter.http.HttpService
import com.advantest.demeter.http.payload.HolidayPayload

import scala.concurrent.Future
import scala.language.implicitConversions

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 */
case class HolidayService()(using system: DemeterSystem, db: Database) extends HttpService(system):
  private val holidayTable: HolidayDBTable = HolidayDBTable()
  private val employeeService: EmployeeService = EmployeeService()

  def createHoliday(employeeId: Long, holiday: HolidayPayload): Future[HolidayPayload] =
    if employeeService.checkIfAdmin(employeeId) then Future.failed(new IllegalArgumentException("Only system admin can create holidays."))
    val tableRowData = HolidayPayload.create(employeeId, holiday)
    holidayTable.insert(tableRowData).map(_.toEntity)

  def createHolidays(employeeId: Long, holidays: Seq[HolidayPayload]): Future[Seq[HolidayPayload]] =
    if employeeService.checkIfAdmin(employeeId) then Future.failed(new IllegalArgumentException("Only system admin can create holidays."))
    val tableRows = holidays.map(holiday => HolidayPayload.create(employeeId, holiday))
    holidayTable.batchInsert(tableRows).map(_.map(_.toEntity))

  def deleteHolidays(employeeId: Long): Future[Seq[HolidayPayload]] =
    if employeeService.checkIfAdmin(employeeId) then Future.failed(throw new IllegalArgumentException("Only system admin can delete holidays."))
    holidayTable.delete().map(_.map(_.toEntity))

  def deleteHolidayById(employeeId: Long, holidayId: Long): Future[HolidayPayload] =
    if employeeService.checkIfAdmin(employeeId) then Future.failed(new IllegalArgumentException("Only system admin can delete holidays."))
    holidayTable.deleteById(holidayId).map(_.toEntity)

  def deleteHolidayByIds(employeeId: Long, holidayIds: Seq[Long]): Future[Seq[HolidayPayload]] =
    if employeeService.checkIfAdmin(employeeId) then Future.failed(new IllegalArgumentException("Only system admin can delete holidays."))
    else holidayTable.deleteByIds(holidayIds).map(_.map(_.toEntity))

  def updateHoliday(employeeId: Long, holiday: HolidayPayload): Future[HolidayPayload] =
    if employeeService.checkIfAdmin(employeeId) then Future.failed(new IllegalArgumentException("Only system admin can update holidays."))
    else
      holidayTable.queryById(holiday.id).flatMap:
        case Some(oldRowData: HolidayDBTableRow) =>
          val updatedTableRowData = HolidayPayload.update(employeeId, holiday, oldRowData)
          holidayTable.update(updatedTableRowData).map(_.toEntity)
        case None =>
          val errorMessage = "Holiday not found"
          Future.failed(new Exception(errorMessage))

  def updateHolidays(employeeId: Long, holidays: Seq[HolidayPayload]): Future[Seq[HolidayPayload]] =
    if employeeService.checkIfAdmin(employeeId) then Future.failed(new IllegalArgumentException("Only system admin can update holidays."))
    else
      holidayTable.queryByIds(holidays.map(_.id)).flatMap: oldRowDataSeq =>
        val oldRowDataMap = oldRowDataSeq.map(oldRowData => oldRowData.id -> oldRowData).toMap
        val updatedTableRowDataSeq = holidays.flatMap: holiday =>
          oldRowDataMap.get(holiday.id).map: oldRowData =>
            HolidayPayload.update(employeeId, holiday, oldRowData)
        holidayTable.update(updatedTableRowDataSeq).map(_.map(_.toEntity))

  def getHolidays: Future[Seq[HolidayPayload]] = holidayTable.query().map(_.map(_.toEntity))

  def getNationalHolidays: Future[Seq[HolidayPayload]] = holidayTable.queryByHolidayType(NationalHoliday).map(_.map(_.toEntity))

  def getCompanyHolidays: Future[Seq[HolidayPayload]] = holidayTable.queryByHolidayType(CompanyHoliday).map(_.map(_.toEntity))

  def getSpecialWorkdays: Future[Seq[HolidayPayload]] = holidayTable.queryByHolidayType(SpecialHoliday).map(_.map(_.toEntity))
