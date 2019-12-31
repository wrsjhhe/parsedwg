#include "Polyline_3d.h"

CPolyline3d::CPolyline3d(Dwg_Object_Entity* pEnt):
	CEntityBase(pEnt)
{
	auto pPoly3d = pEnt->tio.POLYLINE_3D;

	for (int i = 0; i < pPoly3d->num_owned; ++i)
	{
		auto v = pPoly3d->vertex[i];
		auto p = v->obj->tio.entity->tio.VERTEX_3D;

		m_points.emplace_back(p->point);
	}
}

CPolyline3d::~CPolyline3d()
{

}

void CPolyline3d::TransformBy(const BITCODE_3BD& vector)
{
	for (int i = 0; i < m_points.size(); ++i)
	{
		m_points.at(i).x += vector.x;
		m_points.at(i).y += vector.y;
		m_points.at(i).z += vector.z;
	}
}
