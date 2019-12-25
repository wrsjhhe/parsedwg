#include "Polyline_3d.h"

CPolyline3d::CPolyline3d(const Dwg_Object_Entity* pEnt):
	CEntityBase(pEnt)
{
	auto pPoly3d = pEnt->tio.POLYLINE_3D;
	m_num_points = pPoly3d->num_owned;

	for (int i = 0; i < m_num_points; ++i)
	{
		auto v = pPoly3d->vertex[i];
		auto p = v->obj->tio.entity->tio.VERTEX_3D;

		m_points.emplace_back(p->point);
	}
}

CPolyline3d::~CPolyline3d()
{

}

