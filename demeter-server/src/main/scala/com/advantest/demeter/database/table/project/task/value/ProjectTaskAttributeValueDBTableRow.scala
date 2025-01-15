package com.advantest.demeter.database.table.project.task.value

import com.advantest.demeter.database.{DBDateTimeValue, DBFieldValue, DBLongValue, DBTableRow}
import com.advantest.demeter.http.payload.ProjectTaskAttributeValuePayload

/**
 * Create on 2024/12/20
 * Author: mengen.dai@outlook.com
 */
final case class ProjectTaskAttributeValueDBTableRow(
                                                      id: DBLongValue,
                                                      taskId: DBLongValue,
                                                      taskAttributeId: DBLongValue,
                                                      taskAttributeValue: DBFieldValue,
                                                      projectId: DBLongValue,
                                                      creatorId: DBLongValue,
                                                      updaterId: DBLongValue,
                                                      createDateTime: DBDateTimeValue = DBDateTimeValue.now(),
                                                      updateDateTime: DBDateTimeValue = DBDateTimeValue.now()
                                                    ) extends DBTableRow:
  def toPayload: ProjectTaskAttributeValuePayload = ProjectTaskAttributeValuePayload(
    id.value,
    taskId.value,
    taskAttributeId.value,
    taskAttributeValue
  )
