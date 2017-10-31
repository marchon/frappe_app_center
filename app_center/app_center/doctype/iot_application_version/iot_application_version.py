# -*- coding: utf-8 -*-
# Copyright (c) 2017, Dirk Chang and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import throw, _
from frappe.utils import now
from frappe.model.document import Document


class IOTApplicationVersion(Document):
	def validate(self):
		self.app_name = frappe.get_value('IOT Application', self.app, 'app_name')
		if self.is_new():
			max_version = frappe.db.sql("select max(version) from `tabIOT Application Version` where app=`{0}`".format(self.app))
			if max_version > self.version:
				throw(_("Version must be bigger than {0}").format(max_version))

	def autoname(self):
		self.name = self.app + "." + str(self.version)

	def on_trash(self):
		from app_center.api import app_remove
		try:
			app_remove(self.app, self.version)
		except Exception as ex:
			frappe.logger(__name__).error(ex.message)

	def set_tested(self):
		self.set("tested", 1)
		self.set("tested_date", now())
		self.save()

	def set_approved(self):
		self.set("approved", 1)
		self.set("approved_date", now())
		self.save()