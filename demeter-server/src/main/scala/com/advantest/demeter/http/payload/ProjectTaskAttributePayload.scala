package com.advantest.demeter.http.payload

import com.advantest.demeter.database.*
import com.advantest.demeter.database.table.project.task.attribute.ProjectTaskAttributeDBTableRow
import com.advantest.demeter.http.HttpPayload
import com.advantest.demeter.json.JsonObject
import com.advantest.demeter.json.serialize.Serializable
import spray.json.DefaultJsonProtocol.*
import spray.json.RootJsonFormat

/**
 * Create on 2024/10/27
 * Author: mengen.dai@outlook.com
 */
final case class ProjectTaskAttributePayload(
                                              id: Long,
                                              taskAttributeName: String,
                                              taskAttributeType: DBFieldType,
                                              properties: Option[JsonObject],
                                              order: Int,
                                            ) extends HttpPayload

object ProjectTaskAttributePayload extends Serializable[ProjectTaskAttributePayload] with DBTableRowFactory:
  override protected type PayloadData = ProjectTaskAttributePayload
  override protected type DBTableRowData = ProjectTaskAttributeDBTableRow

  override given serializeFormat: RootJsonFormat[PayloadData] = jsonFormat5(ProjectTaskAttributePayload.apply)

  override def create(employeeId: Long, payloadData: PayloadData, options: OptionalData = None): DBTableRowData =
    val maybeProjectId = options.flatMap(_.get("projectId").map(_.asInstanceOf[Long]))
    maybeProjectId match
      case Some(projectId) =>
        ProjectTaskAttributeDBTableRow(
          id = DBLongValue(payloadData.id),
          taskAttributeName = DBVarcharValue(payloadData.taskAttributeName),
          taskAttributeType = payloadData.taskAttributeType,
          properties = payloadData.properties.map(p => DBJsonValue(p)),
          order = DBIntValue(payloadData.order),
          projectId = DBLongValue(projectId),
          creatorId = DBLongValue(employeeId),
          updaterId = DBLongValue(employeeId),
        )
      case None => throw new IllegalArgumentException("ProjectId are required when creating a ProjectTaskAttributeTableRow")

  override def update(employeeId: Long, payloadData: PayloadData, oldRowData: DBTableRowData, options: OptionalData = None): DBTableRowData = oldRowData.copy(
    taskAttributeName = DBVarcharValue(payloadData.taskAttributeName),
    taskAttributeType = payloadData.taskAttributeType,
    properties = payloadData.properties.map(p => DBJsonValue(p)),
    order = DBIntValue(payloadData.order),
    updaterId = DBLongValue(employeeId),
    updateDateTime = DBDateTimeValue.now()
  )