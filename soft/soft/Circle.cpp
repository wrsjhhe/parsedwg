#include "Circle.h"

CCircle::CCircle(Dwg_Object_Entity* pEnt):
	CEntityBase(pEnt)
{
	auto pCircle = pEnt->tio.CIRCLE;
	m_center = pCircle->center;
	m_radius = pCircle->radius;
	m_thickness = pCircle->thickness;
}

CCircle::~CCircle()
{

}

void CCircle::TransformBy(const BITCODE_3BD& vector)
{
	m_center.x += vector.x;
	m_center.y += vector.y;
	m_center.z += vector.z;
}