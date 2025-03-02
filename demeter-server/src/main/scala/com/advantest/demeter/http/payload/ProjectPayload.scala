package com.advantest.demeter.http.payload

import com.advantest.demeter.constant.project.ProjectStatus
import com.advantest.demeter.database.*
import com.advantest.demeter.database.table.project.ProjectDBTableRow
import com.advantest.demeter.http.HttpPayload
import com.advantest.demeter.json.serialize.Serializable
import spray.json.DefaultJsonProtocol.*
import spray.json.RootJsonFormat

import java.time.LocalDate

/**
 * Create on 2024/10/27
 * Author: mengen.dai@outlook.com
 */
final case class ProjectPayload(
                                 id: Long,
                                 projectName: String,
                                 projectStatus: ProjectStatus,
                                 description: Option[String],
                                 startDateTime: LocalDate,
                                 endDateTime: Option[LocalDate] = None,
                                 version: Option[Int] = None,
                                 order: Option[Int] = None,
                               ) extends HttpPayload

object ProjectPayload extends Serializable[ProjectPayload] with DBTableRowFactory:
  override protected type PayloadData = ProjectPayload
  override protected type DBTableRowData = ProjectDBTableRow

  override given serializeFormat: RootJsonFormat[PayloadData] = jsonFormat8(ProjectPayload.apply)

  override def create(employeeId: Long, payloadData: PayloadData, options: OptionalData = None): DBTableRowData = ProjectDBTableRow(
    id = DBLongValue(payloadData.id),
    projectName = DBVarcharValue(payloadData.projectName),
    projectStatus = DBIntValue(payloadData.projectStatus.toInt),
    description = payloadData.description.map(d => DBTextValue(d)),
    startDateTime = DBDateValue(payloadData.startDateTime),
    endDateTime = payloadData.endDateTime.map(e => DBDateValue(e)),
    version = payloadData.version.map(v => DBIntValue(v)),
    order = payloadData.order.map(o => DBIntValue(o)),
    creatorId = DBLongValue(employeeId),
    updaterId = DBLongValue(employeeId),
  )

  override def update(employeeId: Long, payloadData: PayloadData, oldRowData: DBTableRowData, options: OptionalData = None): DBTableRowData = oldRowData.copy(
    projectName = DBVarcharValue(payloadData.projectName),
    projectStatus = DBIntValue(payloadData.projectStatus.toInt),
    description = payloadData.description.map(d => DBTextValue(d)),
    startDateTime = DBDateValue(payloadData.startDateTime),
    endDateTime = payloadData.endDateTime.map(e => DBDateValue(e)),
    version = payloadData.version.map(v => DBIntValue(v)),
    order = payloadData.order.map(o => DBIntValue(o)),
    updaterId = DBLongValue(employeeId),
    updateDateTime = DBDateTimeValue.now()
  )
