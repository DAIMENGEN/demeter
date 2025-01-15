package com.advantest.demeter.database.table.team

import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.{DBTableSchema, DBTableSchemaAbstract, DBTextValue, DBVarcharValue}
import slick.lifted.ProvenShape

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
final class TeamDBTableSchema(tag: Tag) extends DBTableSchemaAbstract[TeamDBTableRow](tag, "TEAM_DB_TABLE") with DBTableSchema:
  def teamName: Rep[DBVarcharValue] = column[DBVarcharValue]("TEAM_NAME", O.SqlType("VARCHAR"), O.Length(255))

  def description: Rep[Option[DBTextValue]] = column[Option[DBTextValue]]("DESCRIPTION", O.SqlType("TEXT"), O.Default(None), O.Default(None))

  override def * : ProvenShape[TeamDBTableRow] = (
    id,
    teamName,
    description,
    creatorId,
    updaterId,
    createDateTime,
    updateDateTime()
  ) <> ((TeamDBTableRow.apply _).tupled, TeamDBTableRow.unapply)
