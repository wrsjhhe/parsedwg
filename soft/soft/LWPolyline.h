#pragma once
#include "EntityBase.h"
#include <vector>

class CLWPolyline : public CEntityBase
{
public:
	explicit CLWPolyline(const Dwg_Object_Entity* pEnt);
	virtual ~CLWPolyline();



private:
	uint32_t					 m_num_points;
	uint32_t					 m_num_bulges;
	std::vector<Dwg_Bitcode_3BD> m_points;
	std::vector<double>			 m_bulges;
	double						 m_thickness;
};

