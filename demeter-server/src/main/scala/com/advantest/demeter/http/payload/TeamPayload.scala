package com.advantest.demeter.http.payload

import com.advantest.demeter.database.*
import com.advantest.demeter.database.table.team.TeamDBTableRow
import com.advantest.demeter.http.HttpPayload
import com.advantest.demeter.json.serialize.Serializable
import spray.json.DefaultJsonProtocol.*
import spray.json.RootJsonFormat

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
final case class TeamPayload(
                              id: Long,
                              teamName: String,
                              description: Option[String]
                            ) extends HttpPayload

object TeamPayload extends Serializable[TeamPayload] with DBTableRowFactory:
  override protected type PayloadData = TeamPayload
  override protected type DBTableRowData = TeamDBTableRow

  override given serializeFormat: RootJsonFormat[PayloadData] = jsonFormat3(TeamPayload.apply)

  override def create(employeeId: Long, payloadData: PayloadData, options: OptionalData = None): DBTableRowData = TeamDBTableRow(
    id = DBLongValue(payloadData.id),
    teamName = DBVarcharValue(payloadData.teamName),
    description = payloadData.description.map(d => DBTextValue(d)),
    creatorId = DBLongValue(employeeId),
    updaterId = DBLongValue(employeeId),
  )

  override def update(employeeId: Long, payloadData: PayloadData, oldRowData: DBTableRowData, options: OptionalData = None): DBTableRowData = oldRowData.copy(
    teamName = DBVarcharValue(payloadData.teamName),
    description = payloadData.description.map(d => DBTextValue(d)),
    updaterId = DBLongValue(employeeId),
    updateDateTime = DBDateTimeValue.now()
  )
