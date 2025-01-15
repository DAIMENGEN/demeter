package com.advantest.demeter.database.table.project.task.attribute

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.{DBLongValue, DBTable}

import scala.concurrent.Future

/**
 * Create on 2024/10/27
 * Author: mengen.dai@outlook.com
 */
final case class ProjectTaskAttributeDBTable()(using val system: DemeterSystem, val db: Database) extends DBTable:
  override protected type TableRowData = ProjectTaskAttributeDBTableRow
  override protected type TableType = ProjectTaskAttributeDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]

  override def tableQuery: TableQuery[ProjectTaskAttributeDBTableSchema] = table

  createTableIfNotExists()

  def queryByProjectId(projectId: Long): Future[Seq[TableRowData]] =
    val select = table.filter(_.projectId === DBLongValue(projectId)).result
    db.run(select)
