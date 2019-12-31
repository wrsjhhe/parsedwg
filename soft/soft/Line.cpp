#include "Line.h"



CLine::CLine(Dwg_Object_Entity* pEnt):
	CEntityBase(pEnt)
{
	auto pLine = pEnt->tio.LINE;

	m_start = pLine->start;
	m_end = pLine->end;
	m_thickness = pLine->thickness;
}


CLine::~CLine()
{
}

void CLine::TransformBy(const BITCODE_3BD& vector)
{
	m_start.x += vector.x;
	m_start.y += vector.y;
	m_start.z += vector.z;

	m_end.x += vector.x;
	m_end.y += vector.y;
	m_end.z += vector.z;
}
