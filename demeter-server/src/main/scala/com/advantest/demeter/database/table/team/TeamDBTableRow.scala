package com.advantest.demeter.database.table.team

import com.advantest.demeter.database.*
import com.advantest.demeter.http.payload.TeamPayload

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
final case class TeamDBTableRow(
                                 id: DBLongValue,
                                 teamName: DBVarcharValue,
                                 description: Option[DBTextValue],
                                 creatorId: DBLongValue,
                                 updaterId: DBLongValue,
                                 createDateTime: DBDateTimeValue = DBDateTimeValue.now(),
                                 updateDateTime: DBDateTimeValue = DBDateTimeValue.now()
                               ) extends DBTableRow:
  def toEntity: TeamPayload = TeamPayload(
    id = id.value,
    teamName = teamName.value,
    description = description.map(_.value)
  )
