#include "LWPolyline.h"

CLWPolyline::CLWPolyline(Dwg_Object_Entity* pEnt):
	CEntityBase(pEnt)
{
	auto pLWPolyline = pEnt->tio.LWPOLYLINE;

	for (int i = 0;i < pLWPolyline->num_points;++i)
	{
		m_points.emplace_back(pLWPolyline->points[i]);
	}

	for (int i = 0;i < pLWPolyline->num_bulges; ++i)
	{
		m_bulges.emplace_back(pLWPolyline->bulges[i]);
	}

	m_thickness = pLWPolyline->thickness;

	if (pLWPolyline->flag == 512) 
	{
		m_closed = true;
	}
	else {
		m_closed = false;
	}
}

CLWPolyline::~CLWPolyline()
{

}

void CLWPolyline::TransformBy(const BITCODE_3BD& vector)
{
	for (size_t i = 0; i < m_points.size(); ++i)
	{
		m_points.at(i).x += vector.x;
		m_points.at(i).y += vector.y;
	}
}