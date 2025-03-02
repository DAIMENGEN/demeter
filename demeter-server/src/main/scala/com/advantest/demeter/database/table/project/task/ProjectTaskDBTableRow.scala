package com.advantest.demeter.database.table.project.task

import com.advantest.demeter.database.*

/**
 * Create on 2024/12/21
 * Author: mengen.dai@outlook.com
 */
final case class ProjectTaskDBTableRow(
                                        id: DBLongValue,
                                        taskName: DBVarcharValue,
                                        parentTaskId: Option[DBLongValue] = None,
                                        projectId: DBLongValue,
                                        creatorId: DBLongValue,
                                        updaterId: DBLongValue,
                                        createDateTime: DBDateTimeValue = DBDateTimeValue.now(),
                                        updateDateTime: DBDateTimeValue = DBDateTimeValue.now()
                                      ) extends DBTableRow
