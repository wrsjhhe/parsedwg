#include "LWPolyline.h"

CLWPolyline::CLWPolyline(const Dwg_Object_Entity* pEnt):
	CEntityBase(pEnt)
{
	auto pLWPolyline = pEnt->tio.LWPOLYLINE;
	m_num_points = pLWPolyline->num_points;
	m_num_bulges = pLWPolyline->num_bulges;

	for (int i = 0;i < m_num_points;++i)
	{
		m_points.emplace_back(pLWPolyline->points[i]);
	}

	for (int i = 0;i < m_num_bulges; ++i)
	{
		m_bulges.emplace_back(pLWPolyline->bulges[i]);
	}

	m_thickness = pLWPolyline->thickness;
}

CLWPolyline::~CLWPolyline()
{

}