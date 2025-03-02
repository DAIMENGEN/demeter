package com.advantest.demeter.database.table.holiday

import com.advantest.demeter.constant.country.CountryCode
import com.advantest.demeter.constant.holiday.HolidayType
import com.advantest.demeter.database.*
import com.advantest.demeter.http.payload.HolidayPayload

/**
 * Create on 2024/10/24
 * Author: mengen.dai@outlook.com
 */
final case class HolidayDBTableRow(
                                    id: DBLongValue,
                                    holidayName: DBVarcharValue,
                                    description: Option[DBTextValue],
                                    holidayDate: DBDateValue,
                                    holidayType: DBIntValue,
                                    isRecurring: DBBooleanValue,
                                    countryCode: DBIntValue,
                                    creatorId: DBLongValue,
                                    updaterId: DBLongValue,
                                    createDateTime: DBDateTimeValue = DBDateTimeValue.now(),
                                    updateDateTime: DBDateTimeValue = DBDateTimeValue.now()
                                  ) extends DBTableRow:
  def toEntity: HolidayPayload = HolidayPayload(
    id.value,
    holidayName.value,
    description.map(_.value),
    holidayDate.value,
    HolidayType.fromInt(holidayType.value),
    isRecurring.value,
    CountryCode.fromInt(countryCode.value)
  )


