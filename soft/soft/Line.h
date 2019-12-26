#pragma once
#include "EntityBase.h"
class CLine : public CEntityBase
{
public:
	explicit CLine(const Dwg_Object_Entity* pEnt);
	virtual ~CLine();


private:
	Dwg_Bitcode_3BD m_start;
	Dwg_Bitcode_3BD m_end;
	double          m_thickness;
};

