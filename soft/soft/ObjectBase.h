#pragma once
#include <dwg.h>
#include <dwg_api.h>

class CObjectBase
{
public:
	CObjectBase(const Dwg_Object* pObject);
	virtual ~CObjectBase();

	const Dwg_Object* m_pObject;
};