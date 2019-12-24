#include "ParseObjectFactory.h"
#include "Line.h"
#include "Circle.h"


CParseObjectFactory::CParseObjectFactory(const Dwg_Object* pObj):
	m_pObj(pObj)
{

}


CParseObjectFactory::~CParseObjectFactory()
{

}


void CParseObjectFactory::ParseEnt()
{
	switch (m_pObj->type)
	{
	case DWG_TYPE_LINE:
	{
		parseLine();
		break;
	}
	case DWG_TYPE_CIRCLE:
	{
		parseCircle();
		break;
	}
	default:
		break;
	}
}

void CParseObjectFactory::parseLine()
{

}

void CParseObjectFactory::parseCircle()
{

}