#pragma once
#include "EntityBase.h"

class CCircle : public CEntityBase
{
public:
	explicit CCircle(const Dwg_Object_Entity* pEnt);

	virtual ~CCircle();

private:
	Dwg_Bitcode_3BD m_center;
	double          m_radius;
	double          m_thickness;
};