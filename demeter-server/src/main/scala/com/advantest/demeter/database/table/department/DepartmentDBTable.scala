package com.advantest.demeter.database.table.department

import com.advantest.demeter.DemeterSystem
import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.{DBTable, DBVarcharValue}

import scala.concurrent.Future

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
final case class DepartmentDBTable()(using val system: DemeterSystem, val db: Database) extends DBTable:
  override protected type TableRowData = DepartmentDBTableRow
  override protected type TableType = DepartmentDBTableSchema
  override protected val table: TableQuery[TableType] = TableQuery[TableType]
  createTableIfNotExists()

  def queryByDepartmentName(departmentName: String): Future[Option[TableRowData]] =
    val select = table.filter(_.departmentName === DBVarcharValue(departmentName)).result.headOption
    db.run(select)

  def queryByDepartmentNameLike(departmentNamePattern: String): Future[Seq[TableRowData]] =
    val select = table.filter(_.departmentName.asColumnOf[String] like s"%$departmentNamePattern%").result
    db.run(select)
