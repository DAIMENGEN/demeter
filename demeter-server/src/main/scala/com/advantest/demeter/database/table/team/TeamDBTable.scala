package com.advantest.demeter.database.table.team

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.{DBTable, DBVarcharValue}

import scala.concurrent.Future

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
final case class TeamDBTable()(using val system: DemeterSystem, val db: Database) extends DBTable:
  override protected type TableRowData = TeamDBTableRow
  override protected type TableType = TeamDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

  def queryByTeamName(teamName: String): Future[Option[TableRowData]] = {
    val select = table.filter(_.teamName === DBVarcharValue(teamName)).result.headOption
    db.run(select)
  }

  def queryByTeamNameLike(teamNamePattern: String): Future[Seq[TableRowData]] = {
    val select = table.filter(_.teamName.asColumnOf[String] like s"%$teamNamePattern%").result
    db.run(select)
  }
