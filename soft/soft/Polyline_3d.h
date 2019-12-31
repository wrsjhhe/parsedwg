#pragma once
#include "EntityBase.h"
#include <vector>

class CPolyline3d : public CEntityBase
{
public:
	explicit CPolyline3d(Dwg_Object_Entity* pEnt);
	virtual ~CPolyline3d();

	virtual void TransformBy(const BITCODE_3BD& vector) override;

	std::vector<BITCODE_3BD>	m_points;
};
