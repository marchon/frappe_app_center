# -*- coding: utf-8 -*-
# Copyright (c) 2017, Dirk Chang and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import throw, _


def get_context(context):
	user_roles = frappe.get_roles(frappe.session.user)
	if 'App User' not in user_roles or frappe.session.user == 'Guest':
		raise frappe.PermissionError

	app = frappe.form_dict.app
	if not app:
		raise frappe.DoesNotExistError(_("Application not specified"))

	doc = frappe.get_doc("IOT Application", app)

	context.no_cache = 0

	context.doc = doc
