#pragma once
#include "EntityBase.h"

class CCircle : public CEntityBase
{
public:
	explicit CCircle(Dwg_Object_Entity* pEnt);

	virtual ~CCircle();

	virtual void TransformBy(const BITCODE_3BD& vector) override;

	BITCODE_3BD		m_center;
	double          m_radius;
	double          m_thickness;
};