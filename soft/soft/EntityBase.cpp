#include "EntityBase.h"
#include "stringFunc.h"

CEntityBase::CEntityBase(Dwg_Object_Entity* pEnt):
	m_pEntity(pEnt)
{
	auto layer = m_pEntity->layer->obj->tio.object->tio.LAYER;
	m_layerName = Utils::GetCadChar(layer->name);

	if (m_pEntity->color.index == 256)
	{
		Utils::GetRealRGB(layer->color.rgb, m_color);
	}
	else if (m_pEntity->color.index == 0)
	{
		m_color = Utils::RGBA(-1);
	}
	else
	{
		Utils::GetRGBbyCadCode(m_pEntity->color.index, m_color);
	}

	if (m_pEntity->color.alpha_type == 0)
	{
		m_color.a = m_pEntity->layer->obj->tio.entity->color.alpha;
	}
	else if (m_pEntity->color.alpha_type == 1)
	{
		m_color.a = -1;
	}
	else
	{
		m_color.a = m_pEntity->color.alpha;
	}
}

CEntityBase::~CEntityBase()
{
	
}