package com.advantest.demeter.database.table.department

import com.advantest.demeter.database.DBJdbcProfile.profile.api.*
import com.advantest.demeter.database.{DBTableSchemaAbstract, DBTextValue, DBVarcharValue}
import slick.lifted.ProvenShape

/**
 * Create on 2024/10/26
 * Author: mengen.dai@outlook.com
 */
final class DepartmentDBTableSchema(tag: Tag) extends DBTableSchemaAbstract[DepartmentDBTableRow](tag, "DEPARTMENT_DB_TABLE"):
  def departmentName: Rep[DBVarcharValue] = column[DBVarcharValue]("DEPARTMENT_NAME", O.SqlType("VARCHAR"), O.Length(255))

  def description: Rep[Option[DBTextValue]] = column[Option[DBTextValue]]("DESCRIPTION", O.SqlType("TEXT"), O.Default(None))

  override def * : ProvenShape[DepartmentDBTableRow] = (
    id,
    departmentName,
    description,
    creatorId,
    updaterId,
    createDateTime,
    updateDateTime()
  ) <> ((DepartmentDBTableRow.apply _).tupled, DepartmentDBTableRow.unapply)
