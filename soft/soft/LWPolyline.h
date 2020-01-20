#pragma once
#include "EntityBase.h"
#include <vector>

class CLWPolyline : public CEntityBase
{
public:
	explicit CLWPolyline(Dwg_Object_Entity* pEnt);
	virtual ~CLWPolyline();

	virtual void TransformBy(const BITCODE_3BD& vector) override;

	std::vector<BITCODE_2RD>     m_points;
	std::vector<double>			 m_bulges;
	double						 m_thickness;
	bool                         m_closed;
};

