package com.advantest.demeter.database.table.department

import com.advantest.demeter.database.*
import com.advantest.demeter.http.payload.DepartmentPayload

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
final case class DepartmentDBTableRow(
                                       id: DBLongValue,
                                       departmentName: DBVarcharValue,
                                       description: Option[DBTextValue],
                                       creatorId: DBLongValue,
                                       updaterId: DBLongValue,
                                       createDateTime: DBDateTimeValue = DBDateTimeValue.now(),
                                       updateDateTime: DBDateTimeValue = DBDateTimeValue.now()
                                     ) extends DBTableRow:
  def toEntity: DepartmentPayload = DepartmentPayload(
    id = id.value,
    departmentName = departmentName.value,
    description = description.map(_.value)
  )
