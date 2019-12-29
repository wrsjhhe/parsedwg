#pragma once
#include <dwg.h>
#include <dwg_api.h>
#include <string>
#include "CadColorMap.h"

class CEntityBase
{
public:
	explicit CEntityBase(const Dwg_Object_Entity* pEnt);
	virtual ~CEntityBase();

	Utils::RGB  m_color;
	std::string m_layerName;
	

	 const Dwg_Object_Entity* m_pEntity;
};