#pragma once
#include "ObjectBase.h"
#include "CadColorMap.h"
#include <string>

class CLayer : public CObjectBase
{
public:
	explicit CLayer(Dwg_Object* pObject);
	virtual ~CLayer();

	std::string m_name;
	Utils::RGBA  m_color;
};