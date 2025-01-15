package com.advantest.demeter.database.table.project

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.{DBTable, DBVarcharValue}

import scala.concurrent.Future

/**
 * Create on 2024/10/27
 * Author: mengen.dai@outlook.com
 */
final case class ProjectDBTable()(using val system: DemeterSystem, val db: Database) extends DBTable:
  override protected type TableRowData = ProjectDBTableRow
  override protected type TableType = ProjectDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

  def queryByProjectName(projectName: String): Future[Option[TableRowData]] =
    val select = table.filter(_.projectName === DBVarcharValue(projectName)).result.headOption
    db.run(select)

  def queryByProjectNameLike(projectNamePattern: String): Future[Seq[TableRowData]] =
    val select = table.filter(_.projectName.asColumnOf[String] like s"%$projectNamePattern%").result
    db.run(select)
