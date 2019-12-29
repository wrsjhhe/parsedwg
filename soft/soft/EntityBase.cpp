#include "EntityBase.h"
#include "stringFunc.h"

CEntityBase::CEntityBase(const Dwg_Object_Entity* pEnt):
	m_pEntity(pEnt)
{
	auto layer = m_pEntity->layer->obj->tio.object->tio.LAYER;
	m_layerName = Utils::GetCadChar(layer->name);

	Utils::RGB rgb;
	if (m_pEntity->color.index == 256)
	{
		Utils::GetRGBbyCadCode(layer->color.index, rgb);
	}
	else if (m_pEntity->color.index == 0)
	{
		//todo
	}
	else
	{
		Utils::GetRGBbyCadCode(m_pEntity->color.index, rgb);
	}




}

CEntityBase::~CEntityBase()
{
	
}