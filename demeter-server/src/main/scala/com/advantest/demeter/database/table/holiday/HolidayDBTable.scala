package com.advantest.demeter.database.table.holiday

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.constant.country.CountryCode
import com.advantest.demeter.constant.holiday.HolidayType
import com.advantest.demeter.database.*
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*

import java.time.LocalDate
import scala.concurrent.Future

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 */
final case class HolidayDBTable()(using val system: DemeterSystem, val db: Database) extends DBTable:
  override protected type TableRowData = HolidayDBTableRow
  override protected type TableType = HolidayDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

  def queryByHolidayName(holidayName: String): Future[Seq[TableRowData]] =
    val select = table.filter(_.holidayName === DBVarcharValue(holidayName)).result
    db.run(select)

  def queryByHolidayNameLike(holidayNamePattern: String): Future[Seq[TableRowData]] =
    val select = table.filter(_.holidayName.asColumnOf[String] like s"%$holidayNamePattern%").result
    db.run(select)

  def queryByHolidayDate(holidayDate: LocalDate): Future[Seq[TableRowData]] =
    val select = table.filter(_.holidayDate === DBDateValue(holidayDate)).result
    db.run(select)

  def queryByHolidayDates(holidayDates: Seq[LocalDate]): Future[Seq[TableRowData]] =
    val select = table.filter(_.holidayDate.inSet(holidayDates.map(date => DBDateValue(date)))).result
    db.run(select)

  def queryByIsRecurring(isRecurring: Boolean): Future[Seq[TableRowData]] =
    val select = table.filter(_.isRecurring === DBBooleanValue(isRecurring)).result
    db.run(select)

  def queryByCountryCode(countryCode: CountryCode): Future[Seq[TableRowData]] =
    val select = table.filter(_.countryCode === DBIntValue(countryCode.toInt)).result
    db.run(select)

  def queryByCountryCodes(countryCodes: Seq[CountryCode]): Future[Seq[TableRowData]] =
    val select = table.filter(_.countryCode.inSet(countryCodes.map(code => DBIntValue(code.toInt)))).result
    db.run(select)

  def queryByHolidayType(holidayType: HolidayType): Future[Seq[TableRowData]] =
    val select = table.filter(_.holidayType === DBIntValue(holidayType.toInt)).result
    db.run(select)
