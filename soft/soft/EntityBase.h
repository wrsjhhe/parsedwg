#pragma once
#include <dwg.h>
#include <dwg_api.h>

class CEntityBase
{
public:
	explicit CEntityBase(const Dwg_Object_Entity* pEnt);
	virtual ~CEntityBase();

protected:
	

private:
	Dwg_Object_Entity* m_pEntity;
};