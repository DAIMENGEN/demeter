package com.advantest.demeter.database.table.holiday

import com.advantest.demeter.database.*
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import slick.lifted.ProvenShape

/**
 * Create on 2024/10/13
 * Author: mengen.dai@outlook.com
 */
final class HolidayDBTableSchema(tag: Tag) extends DBTableSchemaAbstract[HolidayDBTableRow](tag, "HOLIDAY_DB_TABLE") {
  def holidayName: Rep[DBVarcharValue] = column[DBVarcharValue]("HOLIDAY_NAME", O.SqlType("VARCHAR"), O.Length(255))

  def description: Rep[Option[DBTextValue]] = column[Option[DBTextValue]]("DESCRIPTION", O.SqlType("TEXT"), O.Default(None))

  def holidayDate: Rep[DBDateValue] = column[DBDateValue]("HOLIDAY_DATE", O.SqlType("VARCHAR"), O.Length(10))

  def holidayType: Rep[DBIntValue] = column[DBIntValue]("HOLIDAY_TYPE")

  def isRecurring: Rep[DBBooleanValue] = column[DBBooleanValue]("IS_RECURRING", O.Default(DBBooleanValue.defaultValue))

  def countryCode: Rep[DBIntValue] = column[DBIntValue]("COUNTRY_CODE")

  override def * : ProvenShape[HolidayDBTableRow] = (
    id,
    holidayName,
    description,
    holidayDate,
    holidayType,
    isRecurring,
    countryCode,
    creatorId,
    updaterId,
    createDateTime,
    updateDateTime()
  ) <> ((HolidayDBTableRow.apply _).tupled, HolidayDBTableRow.unapply)
}
