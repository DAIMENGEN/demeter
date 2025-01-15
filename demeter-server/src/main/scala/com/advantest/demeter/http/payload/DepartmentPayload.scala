package com.advantest.demeter.http.payload

import com.advantest.demeter.database.*
import com.advantest.demeter.database.table.department.DepartmentDBTableRow
import com.advantest.demeter.http.HttpPayload
import com.advantest.demeter.json.serialize.Serializable
import spray.json.DefaultJsonProtocol.*
import spray.json.RootJsonFormat

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
final case class DepartmentPayload(
                                    id: Long,
                                    departmentName: String,
                                    description: Option[String]
                                  ) extends HttpPayload

object DepartmentPayload extends Serializable[DepartmentPayload] with DBTableRowFactory:
  override protected type PayloadData = DepartmentPayload
  override protected type DBTableRowData = DepartmentDBTableRow

  override given serializeFormat: RootJsonFormat[PayloadData] = jsonFormat3(DepartmentPayload.apply)

  override def create(employeeId: Long, payloadData: PayloadData, options: OptionalData = None): DBTableRowData = DepartmentDBTableRow(
    id = DBLongValue(payloadData.id),
    departmentName = DBVarcharValue(payloadData.departmentName),
    description = payloadData.description.map(d => DBTextValue(d)),
    creatorId = DBLongValue(employeeId),
    updaterId = DBLongValue(employeeId)
  )

  override def update(employeeId: Long, payloadData: PayloadData, oldRowData: DBTableRowData, options: OptionalData = None): DBTableRowData = oldRowData.copy(
    departmentName = DBVarcharValue(payloadData.departmentName),
    description = payloadData.description.map(d => DBTextValue(d)),
    updaterId = DBLongValue(employeeId),
    updateDateTime = DBDateTimeValue.now()
  )