#include "Circle.h"

CCircle::CCircle(const Dwg_Object_Entity* pEnt):
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