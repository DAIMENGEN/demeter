package com.advantest.demeter.database.table.project.task

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.{DBLongValue, DBTable}

import scala.concurrent.Future

/**
 * Create on 2024/12/21
 * Author: mengen.dai@outlook.com
 */
final case class ProjectTaskDBTable()(using val system: DemeterSystem, val db: Database) extends DBTable:
  override protected type TableRowData = ProjectTaskDBTableRow
  override protected type TableType = ProjectTaskDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

  def queryByProjectId(projectId: Long): Future[Seq[ProjectTaskDBTableRow]] =
    val select = table.filter(_.projectId === DBLongValue(projectId)).result
    db.run(select)
