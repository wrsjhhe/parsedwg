#pragma once
#include "EntityBase.h"

class CParseObjectFactory
{
public:
	explicit CParseObjectFactory(const Dwg_Object* pObj);
	~CParseObjectFactory();

	void ParseEnt();

private:
	void parseLine();
	void parseCircle();

private:
	const Dwg_Object* m_pObj;
};

