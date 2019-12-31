#pragma once
#include <dwg.h>
#include <dwg_api.h>

class CObjectBase
{
public:
	CObjectBase(Dwg_Object* pObject);
	virtual ~CObjectBase();

	Dwg_Object* m_pObject;
};