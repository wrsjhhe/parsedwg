#pragma once
#include "EntityBase.h"

class CLine : public CEntityBase
{
public:
	explicit CLine(Dwg_Object_Entity* pEnt);
	virtual ~CLine();

	virtual void TransformBy(const BITCODE_3BD& vector) override;

	BITCODE_3BD m_start;
	BITCODE_3BD m_end;
	double          m_thickness;
};

