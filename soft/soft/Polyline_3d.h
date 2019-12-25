#pragma once
#include "EntityBase.h"
#include <vector>

class CPolyline3d : public CEntityBase
{
public:
	explicit CPolyline3d(const Dwg_Object_Entity* pEnt);
	virtual ~CPolyline3d();



private:
	uint32_t					 m_num_points;
	std::vector<Dwg_Bitcode_3BD> m_points;
};
