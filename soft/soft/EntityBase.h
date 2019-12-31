#pragma once
#include <dwg.h>
#include <dwg_api.h>
#include <string>
#include "CadColorMap.h"

class CEntityBase
{
public:
	explicit CEntityBase(Dwg_Object_Entity* pEnt);
	virtual ~CEntityBase();


	void virtual TransformBy(const BITCODE_3BD& vector)
	{
		
	}

	Utils::RGBA  m_color;
	std::string m_layerName;
	

	Dwg_Object_Entity* m_pEntity;
};