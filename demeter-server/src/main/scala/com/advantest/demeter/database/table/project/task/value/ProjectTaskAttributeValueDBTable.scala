package com.advantest.demeter.database.table.project.task.value

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.{DBLongValue, DBTable}

import scala.concurrent.Future

/**
 * Create on 2024/12/20
 * Author: mengen.dai@outlook.com
 */
trait ProjectTaskAttributeValueDBTable extends DBTable:
  override protected type TableRowData = ProjectTaskAttributeValueDBTableRow
  override protected type TableType <: ProjectTaskAttributeValueDBTableSchema[TableRowData]

  def queryByTaskId(taskId: Long): Future[Seq[TableRowData]] =
    val select = table.filter(_.taskId === DBLongValue(taskId)).result
    db.run(select)

  def queryByProjectId(projectId: Long): Future[Seq[TableRowData]] =
    val select = table.filter(_.projectId === DBLongValue(projectId)).result
    db.run(select)

final case class ProjectTaskBooleanTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskBooleanTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskDatetimeTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskDatetimeTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskDateTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskDateTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskDoubleTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskDoubleTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[ProjectTaskDoubleTypeAttributeValueDBTableSchema] = TableQuery[ProjectTaskDoubleTypeAttributeValueDBTableSchema]
  createTableIfNotExists()

final case class ProjectTaskFloatTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskFloatTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskIntTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskIntTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskJsonTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskJsonTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskLongTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskLongTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskStringTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskStringTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskTextTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskTextTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskMediumtextTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskMediumtextTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

final case class ProjectTaskLongtextTypeAttributeValueDBTable()(using val system: DemeterSystem, val db: Database) extends ProjectTaskAttributeValueDBTable:
  override protected type TableType = ProjectTaskLongtextTypeAttributeValueDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()


