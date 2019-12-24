#include "Line.h"



CLine::CLine(const Dwg_Object_Entity* pEnt):
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
